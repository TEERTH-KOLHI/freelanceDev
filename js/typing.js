document.addEventListener('DOMContentLoaded', () => {
    const headlineElement = document.querySelector('.hero-headline');

    if (headlineElement) {
        const textPart1 = "Freelance Website Developer & ";
        const textPart2 = "Bug Fixer";
        const typingSpeed = 50;

        // --- Typing Logic ---

        // Create Layout Structure (Ghost Element Strategy)
        headlineElement.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'typing-wrapper';

        // Ghost Element
        const ghost = document.createElement('div');
        ghost.className = 'typing-ghost';
        ghost.innerHTML = `Freelance Website Developer & <span>Bug Fixer</span>`;

        // Active Element
        const active = document.createElement('div');
        active.className = 'typing-active';

        wrapper.appendChild(ghost);
        wrapper.appendChild(active);
        headlineElement.appendChild(wrapper);

        // Cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';

        async function typeText(text, element, moveCursorToEnd = false) {
            if (moveCursorToEnd) {
                element.appendChild(cursor);
            }
            for (let i = 0; i < text.length; i++) {
                const charNode = document.createTextNode(text[i]);
                element.insertBefore(charNode, cursor);
                const randomDelay = typingSpeed + Math.random() * 50;
                await new Promise(resolve => setTimeout(resolve, randomDelay));
            }
        }

        async function runOnce() {
            // Clear Active Layer
            active.innerHTML = '';
            active.appendChild(cursor);

            // 1. Wait a moment before starting
            await new Promise(resolve => setTimeout(resolve, 500));

            // 2. Type Part 1
            await typeText(textPart1, active);

            // 3. Create Span for Part 2
            const span = document.createElement('span');
            active.insertBefore(span, cursor);
            span.appendChild(cursor);

            // 4. Type Part 2
            await typeText(textPart2, span);
        }

        runOnce();
    }
});
