<!-- To see your HTML file online, you need to host it on a web server. Here are a few ways to do that:

1. **Using GitHub Pages:**
- Create a repository on GitHub and push your HTML file to it:
    1. Go to [GitHub](https://github.com/) and log in to your account.
    2. Click on the "+" icon in the top right corner and select "New repository".
    3. Name your repository (e.g., `my-website`) and click "Create repository".
    4. Follow the instructions to push your existing HTML file to the repository. You can use the following commands in your terminal:
        ```sh
        cd /Users/alejandraesquerro/Documents/Ale/dev/nomadpixel/personal/landing
        git init
        git add home.html
        git commit -m "Initial commit test2"
        git branch -M main
        git remote add origin https://github.com/nomadpixel-25/landing.git
        git push -u origin main
        ```
- Go to the repository settings:
    1. Navigate to your repository on GitHub.
    2. Click on the "Settings" tab.
    3. Scroll down to the "GitHub Pages" section.
    4. Under "Source", select the branch you want to use (usually `main` or `master`).
    5. Click "Save".
- GitHub will provide you with a URL where your page is hosted. You can find this URL in the "GitHub Pages" section of the repository settings. -->

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to My Website</title>
        <!-- Add Bootstrap CSS -->
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        
        <!-- Add Bootstrap JS and dependencies -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
        }
        .container {
            text-align: center;
            background: white;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            margin-bottom: 20px;
        }
        p {
            margin-bottom: 30px;
        }
        a {
            display: inline-block;
            padding: 10px 20px;
            color: white;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
        }
        a:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>This is a simple landing page hosted on GitHub Pages.</p>
        <a href="./walkloop/walk-loop-react" target="_blank">Visit my WalkLoop</a><p></p>
        <a href="./chores/chore-management-app/public/index.html" target="_blank">Visit my Chores app</a>
    </div>

</body>
</html>