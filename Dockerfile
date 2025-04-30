FROM mcr.microsoft.com/playwright:v1.52.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the project files
COPY . .

# Command to run tests and generate HTML report
CMD npx playwright test --reporter=html