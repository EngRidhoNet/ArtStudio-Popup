# ArtStudio Popup Plugin

![WordPress](https://img.shields.io/badge/WordPress-%23117AC9.svg?style=for-the-badge&logo=WordPress&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)

A powerful and flexible WordPress popup plugin built with modern technologies. Create and manage beautiful, responsive popups with ease using WordPress custom post types and React.

## 🌟 Features

- **Modern Architecture**
  - Object-Oriented Programming (OOP) with PHP namespaces
  - Singleton Pattern implementation
  - Custom traits and interfaces
  - WordPress REST API integration

- **Custom Post Type Integration**
  - Native WordPress custom fields
  - No external plugin dependencies
  - Simple and intuitive admin interface

- **Frontend Excellence**
  - Built with React for smooth interactions
  - SASS styling for maintainable CSS
  - Responsive design
  - Customizable animations

- **Security First**
  - Protected REST API endpoints
  - WordPress nonce verification
  - User authentication checks

## 📋 Requirements

- WordPress 5.8 or higher
- PHP 7.4 or higher
- Node.js 14 or higher
- npm 6 or higher

## 🚀 Installation

### Manual Installation

1. Clone this repository into your WordPress plugins directory:
```bash
cd wp-content/plugins
git clone https://github.com/EngRidhoNet/ArtStudio-Popup
```

2. Install dependencies:
```bash
cd artstudio-popup
npm install
```

3. Build the assets:
```bash
npm run build
npm run sass
```

4. Activate the plugin through the WordPress admin interface:
   - Navigate to Plugins > Installed Plugins
   - Find "ArtStudio Popup"
   - Click "Activate"

### Using Composer (Alternative)

1. Add the repository to your `composer.json`:
```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/EngRidhoNet/ArtStudio-Popup"
        }
    ]
}
```

## 🔧 Development Setup

1. Install development dependencies:
```bash
npm install --save-dev @wordpress/scripts sass
```

2. Start development server:
```bash
npm run start
```

3. Watch SASS files:
```bash
npm run sass -- --watch
```

## 📖 Usage

### Creating a Popup

1. In WordPress admin, go to "Popups" > "Add New"
2. Fill in the following fields:
   - Title: The popup title
   - Description: The popup content (supports HTML)
   - Page: The page URL where the popup should appear
3. Click "Publish" to save your popup

### Customizing Display Rules

- Use `*` in the Page field to show the popup on all pages
- Enter specific page URLs to target individual pages
- Multiple pages can be targeted using comma-separated values

### Styling Customization

1. Create a `custom.scss` file in `src/scss/`:
```scss
// Override default variables
$popup-bg: rgba(0, 0, 0, 0.9);
$content-bg: #f5f5f5;
$primary-color: #ff4444;
```

2. Import it in `popup.scss`:
```scss
@import 'custom';
```

3. Rebuild styles:
```bash
npm run sass
```

## 🔍 API Documentation

### REST API Endpoints

#### Get All Popups
```
GET /wp-json/artistudio/v1/popup
```

Required Headers:
- `X-WP-Nonce`: WordPress nonce
- User must be logged in

Response Format:
```json
[
    {
        "id": 1,
        "title": "Example Popup",
        "description": "Popup content here",
        "page": "/example-page"
    }
]
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the GPL v2 or later - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Ridho Aulia Rahman - *Halcyon* - [Me](https://github.com/EngRidhoNet)

## 🐛 Troubleshooting

### Common Issues

1. **Popup not showing:**
   - Check if the page URL matches exactly
   - Verify user permissions
   - Check browser console for errors

2. **Build fails:**
   - Ensure all dependencies are installed
   - Clear npm cache: `npm cache clean --force`
   - Remove node_modules and reinstall

3. **API errors:**
   - Verify WordPress permalinks are set
   - Check REST API is enabled
   - Confirm user is logged in

For more issues, please check the [issues page](https://github.com/EngRidhoNet/ArtStudio-Popup/issues).
