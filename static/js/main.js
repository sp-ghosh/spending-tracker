// main.js — students will add JavaScript here as features are built

let ytPlayer;

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('youtubePlayer', {
    videoId: 'dQw4w9WgXcQ',
    playerVars: { rel: 0, modestbranding: 1 }
  });
}

function openVideoModal() {
  document.getElementById('videoModal').classList.add('active');
}

function closeVideoModal() {
  document.getElementById('videoModal').classList.remove('active');
  if (ytPlayer) ytPlayer.stopVideo();
}

document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.querySelector('.video-modal-overlay');
  if (overlay) overlay.addEventListener('click', closeVideoModal);
});
