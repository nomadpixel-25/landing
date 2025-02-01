
// document.addEventListener('DOMContentLoaded', () => {
//     const lastModified = new Date(document.lastModified).toLocaleString('en-GB', {
//         timeZone: 'Europe/London',
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit'
//     });
//     document.getElementById('lastSavedTime').innerText = lastModified;
// });




async function fetchLatestCommitTime() {
    try {
        const lastModified = new Date(document.lastModified).toLocaleString('en-GB', {
            timeZone: 'Europe/London',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        // const response = await fetch('https://api.github.com/repos/nomadpixel-25/landing/commits');
        // const data = await response.json();
        // const latestCommit = data[0];
        // const commitTime = new Date(latestCommit.commit.author.date).toLocaleString('en-GB', {
        //     timeZone: 'Europe/London',
        //     day: '2-digit',
        //     month: '2-digit',
        //     year: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit'
        });
        document.getElementById('commitTime').innerText = commitTime;
    } catch (error) {
        document.getElementById('commitTime').innerText = 'Error fetching commit time';
    }
}

fetchLatestCommitTime();
