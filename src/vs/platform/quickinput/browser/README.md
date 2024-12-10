# Quick Input Widget Implementation

## Centering Mechanism

The Quick Input widget (Command Palette) is centered on screen using a combination of CSS positioning and dynamic width calculation:

### CSS Implementation (`quickInput.css`)
```css
.quick-input-widget {
    position: absolute;
    width: 600px;
    left: 50%;
    margin-left: -300px;
    z-index: 2550;
}
```

### Dynamic Width Calculation (`quickInputController.ts`)
The width is dynamically adjusted based on the window size while maintaining center alignment:
```typescript
const width = Math.min(this.dimension!.width * 0.62 /* golden cut */, QuickInputController.MAX_WIDTH);
style.width = width + 'px';
style.marginLeft = '-' + (width / 2) + 'px';
```

### Vertical Positioning
Vertical position is managed through the `titleBarOffset` property to ensure proper placement relative to the window's top bar.

## Key Features
- Horizontal centering via CSS `left: 50%` and negative margin
- Responsive width using golden ratio (62% of window width)
- Maximum width constraint of 600px
- Dynamic margin calculation for perfect centering
- Proper z-index handling for overlay display
