# PENTAGON FREIGHT PROJECT DOCUMENTATION

## 1. OVERVIEW

- **Project Name**: PENTAGON FREIGHT

- **Project Description**:
  - Pentagon Freight is a web-based logistics management platform designed to streamline freight operations, track shipments in real-time, and manage logistics documentation efficiently.
  - It provides a user-friendly interface for shipping and receiving, enabling efficient management of these processes.

- **Tech Stack and Tools**:
  - **Frontend**: Next.js
  - **UI Library**: Mantine
  - **CMS**: Contentful

- **Deployment**:
  - **Platform**: AWS S3 + CloudFront
  - **Bucket Name**: `pentagonfreight`
  - **Environment**: Production
  - **Deployment Method**: CI/CD with GitHub Actions
  - **Live URL**: [https://pentagonfreight.com](https://pentagonfreight.com)

---

## 2. LOCAL SETUP INSTRUCTIONS

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/pentagonfreight.git
```

2. **Navigate to the project directory**:

```bash
cd pentagonfreight
```

3. **Install dependencies**:

```bash
npm install
```

4. **Start the development server**:

```bash
npm run dev
```

5. **Access the application**:
   - Open your browser and navigate to: [http://localhost:3000](http://localhost:3000).

6. **Build the project for production**:

```bash
npm run build
```

---

## 3. CONTENTFUL - CMS CONFIGURATION

**Contentful CMS** is used to manage the content of the website, including the main page, shipping, and receiving pages.

### Steps to Configure Contentful:

1. **Create a new Contentful space**.
2. **Create a new Contentful environment**.
3. **Generate a Contentful API key**.
4. **Add the API key to the `.env.local` file**.
5. **Update the `contentful.js` file** with the space ID and environment ID.

### Retrieving Contentful Credentials:

#### 3.1 Contentful API Key:
- Log in to your Contentful account.
- Go to the **API keys** section.
- Click on **Create API key**.
- Copy the generated **API key** and add it to your `.env.local` file.

#### 3.2 Contentful Space ID & Environment ID:
- Log in to Contentful.
- Navigate to **Spaces** > Select the space > **Environments**.
- Copy the **Space ID** and **Environment ID**.
- Update these in the `.env.local` file.

---

## 4. CONTENTFUL API TOKENS OVERVIEW

This project uses multiple Contentful API tokens to manage and access content securely. Below is a breakdown of the tokens:

### 4.1 Contentful Access Token
- **Purpose**: Access published content.
- **Usage**: Used by the frontend to fetch live content.
- **Scope**: Read-only access.
- **Environment**: Production.

---

### 4.2 Contentful Management Access Token
- **Purpose**: Manage content programmatically.
- **Usage**: Used by backend scripts or CI/CD pipelines.
- **Scope**: Full read-write access.
- **Note**: **Never expose this token** in client-side code.

---

### 4.3 Contentful Preview Access Token
- **Purpose**: Access draft/unpublished content.
- **Usage**: Used for previewing content changes.
- **Scope**: Read-only access to drafts.
- **Environment**: Development/Preview.

---

### ⚠️ **Important Security Notes**

- For frontend content changes, only the **Contentful Access Token** is required.
- **Never expose the Management Access Token** to the public.
- Use environment variables to store all tokens securely.

---

## 5. ENVIRONMENT VARIABLES SETUP

**Create a `.env.local` file** in the root directory with the following keys:

```bash
# Contentful Credentials
CONTENTFUL_SPACE_ID=<YOUR_SPACE_ID>
CONTENTFUL_ACCESS_TOKEN=<YOUR_ACCESS_TOKEN>
CONTENTFUL_PREVIEW_ACCESS_TOKEN=<YOUR_PREVIEW_ACCESS_TOKEN>
```

---

## 6. NEXT.JS CONFIGURATION

Follow these steps to configure Next.js correctly:

1. **Create `.env.local`** if it doesn't exist.
2. **Add necessary environment variables** as shown above.
3. **Ensure `.env.local` is listed in `.gitignore`** to avoid exposing sensitive information.

---

## 7. TROUBLESHOOTING

### 1. **Build Fails**:
- Ensure all environment variables are correctly set.
- Run `npm install` to install missing dependencies.

### 2. **Content Not Updating**:
- Check if Contentful tokens are correct.
- Verify content is published in the Contentful dashboard.

### 3. **Deployment Issues**:
- Inspect GitHub Actions logs for errors.
- Confirm AWS S3 and CloudFront configurations are correctly set.

---



