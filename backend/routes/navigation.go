package routes

import (
	"github.com/gin-gonic/gin"
	"navigation-site/db"
	"net/http"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/entries", getEntries)
	r.POST("/add", addEntry)
	r.POST("/delete/:id", deleteEntry)
	r.POST("/edit/:id", editEntry)
}

func getEntries(c *gin.Context) {
	rows, err := db.DB.Query("SELECT id, name, url, category FROM navigation")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database query error"})
		return
	}
	defer rows.Close()

	var entries []map[string]interface{}
	for rows.Next() {
		var id int
		var name, url, category string
		if err := rows.Scan(&id, &name, &url, &category); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Row scan error"})
			return
		}
		entries = append(entries, gin.H{"id": id, "name": name, "url": url, "category": category})
	}

	c.JSON(http.StatusOK, entries)
}

func addEntry(c *gin.Context) {
	var json struct {
		Name     string `json:"name"`
		URL      string `json:"url"`
		Category string `json:"category"`
	}
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}
	_, err := db.DB.Exec("INSERT INTO navigation (name, url, category) VALUES (?, ?, ?)", json.Name, json.URL, json.Category)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database insert error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

func deleteEntry(c *gin.Context) {
	id := c.Param("id")
	_, err := db.DB.Exec("DELETE FROM navigation WHERE id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database delete error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

func editEntry(c *gin.Context) {
	id := c.Param("id")
	var json struct {
		Name     string `json:"name"`
		URL      string `json:"url"`
		Category string `json:"category"`
	}
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}
	_, err := db.DB.Exec("UPDATE navigation SET name = ?, url = ?, category = ? WHERE id = ?", json.Name, json.URL, json.Category, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database update error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
