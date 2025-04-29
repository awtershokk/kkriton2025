package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"io"
	"log"
	"net/http"
	"strings"
)

const apiKey = "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"

// Обработчик WebSocket соединений
func handleWebSocket(conn *websocket.Conn) {
	defer conn.Close()

	// История сообщений для контекста
	messages := []map[string]string{
		{
			"role":    "system",
			"content": "Ты являешься ассистентом, который помогает людям, тебя зовут 'ГОЙДА-БОТ' интересующимся поддержкой ветеранов, участников СВО, семей военных, а также волонтеров и НКО, работающих в этой сфере. Ты должен отвечать только на вопросы, связанные с помощью ветеранам, правовыми, медицинскими и психологическими вопросами, а также на вопросы, связанные с волонтерскими и благотворительными мероприятиями. Пожалуйста, игнорируй любые вопросы, не относящиеся к этим темам. Не используй в свокй речи английские слова, Ты не должен писать про то что у тебя такая постановка. Далее будет сообщение пользователя:",
		},
	}

	for {
		// Чтение сообщения от клиента
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Ошибка чтения сообщения:", err)
			break
		}

		// Проверка на команду выхода
		userMessage := string(msg)
		if strings.ToLower(userMessage) == "exit" {
			fmt.Println("👋 Соединение закрыто пользователем.")
			break
		}

		// Добавляем сообщение пользователя в историю
		messages = append(messages, map[string]string{
			"role":    "user",
			"content": userMessage,
		})

		// Подготовка тела запроса
		requestBody := map[string]interface{}{
			"model":    "qwen/qwen3-30b-a3b:free",
			"messages": messages,
		}

		body, err := json.Marshal(requestBody)
		if err != nil {
			log.Printf("Ошибка кодирования запроса: %v", err)
			continue
		}

		// Отправляем запрос к модели
		url := "https://openrouter.ai/api/v1/chat/completions"
		req, err := http.NewRequestWithContext(context.Background(), "POST", url, bytes.NewBuffer(body))
		if err != nil {
			log.Printf("Ошибка создания запроса: %v", err)
			continue
		}

		req.Header.Set("Authorization", "Bearer "+apiKey)
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("HTTP-Referer", "https://yourwebsite.com")
		req.Header.Set("X-Title", "Go Chat App")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("Ошибка отправки запроса: %v", err)
			continue
		}
		defer resp.Body.Close()

		var response struct {
			Choices []struct {
				Message struct {
					Content string `json:"content"`
				} `json:"message"`
			} `json:"choices"`
		}

		responseBody, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Printf("Ошибка чтения ответа: %v", err)
			continue
		}

		if err := json.Unmarshal(responseBody, &response); err != nil {
			log.Printf("Ошибка парсинга ответа: %v", err)
			continue
		}

		assistantReply := response.Choices[0].Message.Content
		assistantReply += " ГОЙДА!!!"

		err = conn.WriteMessage(websocket.TextMessage, []byte(assistantReply))
		if err != nil {
			log.Printf("Ошибка отправки сообщения клиенту: %v", err)
			break
		}

		messages = append(messages, map[string]string{
			"role":    "assistant",
			"content": assistantReply,
		})
	}
}

func main() {
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		upgrader := websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		}

		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println("Ошибка соединения:", err)
			return
		}

		handleWebSocket(conn)
	})

	fmt.Println("WebSocket сервер запущен на ws://localhost:8080/ws")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
