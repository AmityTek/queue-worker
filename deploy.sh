#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Functions for various actions
function start_containers() {
  echo -e "${GREEN}Starting containers...${NC}"
  docker-compose up --build -d
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Containers started successfully.${NC}"
  else
    echo -e "${RED}Failed to start containers.${NC}"
    exit 1
  fi
}

function stop_containers() {
  echo -e "${GREEN}Stopping containers...${NC}"
  docker-compose down
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Containers stopped successfully.${NC}"
  else
    echo -e "${RED}Failed to stop containers.${NC}"
    exit 1
  fi
}

function clean_unused() {
  echo -e "${GREEN}Cleaning up unused Docker resources...${NC}"
  docker system prune -af --volumes
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Unused Docker resources cleaned successfully.${NC}"
  else
    echo -e "${RED}Failed to clean Docker resources.${NC}"
    exit 1
  fi
}

function logs_containers() {
  echo -e "${GREEN}Displaying logs from containers...${NC}"
  docker-compose logs -f
}

# Display menu options
function show_menu() {
  echo -e "${GREEN}Docker Deployment Script${NC}"
  echo "1. Start containers"
  echo "2. Stop containers"
  echo "3. Clean unused Docker resources"
  echo "4. Show logs"
  echo "5. Exit"
}

# Main execution loop
while true; do
  show_menu
  read -p "Enter your choice: " choice
  case $choice in
    1)
      start_containers
      ;;
    2)
      stop_containers
      ;;
    3)
      clean_unused
      ;;
    4)
      logs_containers
      ;;
    5)
      echo -e "${GREEN}Exiting.${NC}"
      exit 0
      ;;
    *)
      echo -e "${RED}Invalid choice. Please try again.${NC}"
      ;;
  esac
done
