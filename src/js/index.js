import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './popup';

// Tunggu DOM siap
document.addEventListener('DOMContentLoaded', function() {
    const container = document.createElement('div');
    container.id = 'artstudio-popup-container';
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<Popup />);
});
