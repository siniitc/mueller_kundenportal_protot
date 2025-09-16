# Müller Manufaktur Customer Portal - Manual Deployment

## Files Included

This package contains all the files needed to deploy the customer portal on your server:

### HTML Pages
- `index.html` - Login page (main entry point)
- `dashboard.html` - Main dashboard after login
- `account.html` - User account management
- `change-password.html` - Password change form
- `error.html` - Login error page
- `forgot-password.html` - Password recovery
- `new-order.html` - Product ordering page
- `order-overview.html` - Order review before confirmation
- `order-details.html` - Individual order details

### Assets
- `style.css` - All styling for the application
- `script.js` - All JavaScript functionality

## Deployment Instructions

1. **Upload all files** to your web server's document root (or subdirectory)
2. **Ensure file permissions** are set correctly (644 for files, 755 for directories)
3. **Test the login** with these credentials:
   - Email: `chefkoch@zumloewen.ch`
   - Password: `Filet`

## Features

✅ **User Authentication** - Secure login system
✅ **Dashboard** - Budget overview and order history
✅ **Product Ordering** - Interactive product catalog with cart
✅ **Order Management** - View, track, and reorder
✅ **Account Management** - Update personal information
✅ **Responsive Design** - Works on desktop and mobile
✅ **Local Storage** - Maintains state between sessions

## Technical Details

- **Pure HTML/CSS/JavaScript** - No server-side requirements
- **Client-side storage** - Uses localStorage for data persistence
- **Responsive design** - Mobile-friendly interface
- **Modern browser support** - Works with all current browsers

## Customization

To customize for your needs:

1. **Update credentials** in `script.js` (line 2-5)
2. **Modify product catalog** in `new-order.html`
3. **Change branding** by updating logo URLs in HTML files
4. **Adjust styling** in `style.css`

## Support

The application includes debug logging in the browser console to help troubleshoot any issues.