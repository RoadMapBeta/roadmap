document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');

    grids.forEach((grid, index) => {
        const userId = grid.getAttribute('data-user-id');
        const discordUrl = `https://lizzy.nu/tools/discorduser`;

        setTimeout(() => {
            const discordIdInput = document.querySelector('#discordid');
            const submitButton = document.querySelector('#submitbtn');
            if (discordIdInput && submitButton) {
                discordIdInput.value = userId;
                submitButton.click();

                setTimeout(() => {
                    const profileImage = document.querySelector('p img');
                    if (profileImage) {
                        const avatarUrl = profileImage.src;
                        const imgElement = grid.querySelector('.grid-img');
                        if (imgElement) {
                            imgElement.src = avatarUrl;
                        }
                    }
                }, 3000);
            }
        }, index * 500);
    });
});
