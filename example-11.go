package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"
)

func countRows(data string) int {
	// Count commas and newlines, assume at least one value
	return strings.Count(data, "\n")
}

func countCsvRowsSync(file string) (int, error) {
	data, err := os.ReadFile(file)
	if err != nil {
		return 0, err
	}
	return countRows(string(data)), nil
}

func countRowsHandler(w http.ResponseWriter, r *http.Request) {
	start := time.Now()

	total, err := countCsvRowsSync(r.PathValue("file") + ".csv")
	if err != nil {
		http.Error(w, fmt.Sprintf(`{"error":"%s"}`, err.Error()), http.StatusInternalServerError)
		return
	}

	elapsed := time.Since(start).Milliseconds()

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"rows": %d, "elapsedMs": %d}`, total, elapsed)
}

func main() {
	http.HandleFunc("/count-rows/{file}", countRowsHandler)

	port := 3000
	fmt.Printf("Server running at http://localhost:%d\n", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		panic(err)
	}
}
