document.addEventListener('DOMContentLoaded', () => {
    const baseUrlInput = document.getElementById('baseUrl');
    const apiKeyInput = document.getElementById('apiKey');
    const modelIdInput = document.getElementById('modelId');
    const saveConfigButton = document.getElementById('saveConfig');
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Load saved configuration
    let config = JSON.parse(localStorage.getItem('config')) || {
        baseUrl: '',
        apiKey: '',
        modelId: ''
    };

    baseUrlInput.value = config.baseUrl;
    apiKeyInput.value = config.apiKey;
    modelIdInput.value = config.modelId;

    saveConfigButton.addEventListener('click', () => {
        config = {
            baseUrl: baseUrlInput.value,
            apiKey: apiKeyInput.value,
            modelId: modelIdInput.value
        };
        localStorage.setItem('config', JSON.stringify(config));
        alert('Configuration saved!');
    });

    sendButton.addEventListener('click', async () => {
        const message = messageInput.value;
        messageInput.value = '';

        // Display user message
        displayMessage(message, 'user');

        try {
            const response = await fetch(`${config.baseUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': config.apiKey
                },
                body: JSON.stringify({
                    modelId: config.modelId,
                    message: message
                })
            });

            const data = await response.json();
            displayMessage(data.response, 'ai');
        } catch (error) {
            console.error('Error:', error);
            displayMessage('Error: Unable to fetch response', 'error');
        }
    });

    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = message;
        messagesDiv.appendChild(messageDiv);
    }
});