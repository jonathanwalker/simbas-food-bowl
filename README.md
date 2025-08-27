# Simbas Food Bowl - 3D STL Viewer

A beautiful, mobile-friendly 3D viewer for the Simbas Food Bowl STL model, built with Three.js and optimized for GitHub Pages.

## Features

- 🎯 **Mobile-Optimized**: Touch-friendly controls with pinch-to-zoom and drag-to-rotate
- 🌟 **Beautiful UI**: Modern gradient background with glass-morphism controls
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Interactive Controls**: 
  - Reset view button
  - Wireframe/solid toggle
  - Info panel with usage instructions
- ⚡ **Fast Loading**: Optimized Three.js setup with efficient rendering
- 🎭 **Professional Lighting**: Multiple light sources for realistic model display
- 🔄 **Auto-Scaling**: Model automatically scales to fit the viewport

## Setup for GitHub Pages

1. **Push your files to GitHub**:
   ```bash
   git add .
   git commit -m "Add 3D STL viewer"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Your site will be available at**:
   `https://[your-username].github.io/[repository-name]`

## File Structure

```
├── index.html          # Main HTML file with UI
├── script.js           # Three.js viewer logic
├── simbas-food-bowl.stl # Your 3D model
└── README.md           # This file
```

## Usage

### Desktop Controls
- **Mouse drag**: Rotate the model
- **Mouse wheel**: Zoom in/out
- **Right-click drag**: Pan the view
- **Reset View button**: Return to initial camera position
- **Wireframe button**: Toggle between solid and wireframe view

### Mobile Controls
- **Single finger drag**: Rotate the model
- **Pinch gesture**: Zoom in/out
- **Double tap**: Reset view
- **Touch and drag**: Pan the view

## Technical Details

- **Three.js Version**: r128 (latest stable)
- **STL Loader**: Built-in Three.js STLLoader
- **Controls**: OrbitControls for smooth camera manipulation
- **Lighting**: Ambient + Directional + Point lights for realistic rendering
- **Performance**: Optimized for mobile devices with pixel ratio limiting

## Customization

### Changing Model Color
Edit the material color in `script.js`:
```javascript
const material = new THREE.MeshPhongMaterial({
    color: 0x8B4513, // Change this hex color
    // ... other properties
});
```

### Adjusting Model Scale
Modify the scale factor in `script.js`:
```javascript
const scale = 3 / maxDim; // Change 3 to adjust size
```

### Background Color
Update the scene background in `script.js`:
```javascript
this.scene.background = new THREE.Color(0x1a1a2e); // Change hex color
```

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Model Not Loading
- Ensure the STL file is in the same directory as `index.html`
- Check that the filename matches exactly: `simbas-food-bowl.stl`
- Verify the file is not corrupted

### Performance Issues
- The viewer automatically limits pixel ratio on mobile devices
- Large STL files may take longer to load
- Consider optimizing your STL file if it's very large

### Mobile Issues
- Ensure you're using a modern mobile browser
- Try refreshing the page if controls feel unresponsive
- Check that JavaScript is enabled

## License

This project is open source and available under the MIT License.

---

**Enjoy viewing your Simbas Food Bowl in 3D! 🐾**
