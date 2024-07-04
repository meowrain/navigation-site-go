package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"navigation-site/db"
	"navigation-site/routes"
)

func main() {
	db.InitDB()

	r := gin.Default()

	r.Use(cors.Default())

	routes.SetupRoutes(r)

	r.Run(":8080")
}
