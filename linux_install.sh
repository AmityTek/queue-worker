#!/bin/bash

# Update the apt package index and install necessary packages
echo "Updating package index..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker’s official GPG key
echo "Adding Docker's GPG key..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up the stable repository
echo "Setting up Docker repository..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine and Docker Compose
echo "Installing Docker Engine and Docker Compose..."
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Enable and start Docker service
echo "Starting Docker service..."
sudo systemctl enable docker
sudo systemctl start docker

# Add current user to the docker group
echo "Adding user to Docker group..."
sudo usermod -aG docker $USER

# Verify installation
echo "Verifying Docker installation..."
docker --version
docker-compose --version

echo "Docker and Docker Compose installed successfully. Please log out and log back in to use Docker without sudo."
./deploy.sh