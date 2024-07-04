package db

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "./navigation.db")
	if err != nil {
		panic(err)
	}

	_, err = DB.Exec(`CREATE TABLE IF NOT EXISTS navigation (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		url TEXT NOT NULL,
		category TEXT NOT NULL
	)`)
	if err != nil {
		panic(err)
	}
}
