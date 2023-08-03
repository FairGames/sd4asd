let mobile = 'ontouchstart' in document.documentElement;

let switchAllowed = false;

function openSocial(type) {
  let url = 'about:blank';

  switch (type) {
    case 'discord':
      url = 'https://discord.gg/jsyR7dSpjU';
      break;
    case 'github':
      url = 'https://github.com/secret';
      break;
	case 'store':
      url = 'https://store.pvpzone.cz/';
	  break;
    case 'twitter':
      url = 'https://twitter.com/riotnetwork01';
      break;
	case 'instagram':
      url = 'https://www.instagram.com/riotnetwork01';
      break;
	case 'facebook':
      url = 'https://twitter.com/secret';
      break;
	case 'youtube':
      url = 'https://twitter.com/secret';
      break;
	case 'bans':
      url = 'http://bans.pvpzone.cz:7896/bans.php';
      break;
  }

  window.open(url);
}

function startIntroTyping() {
  new TypeIt('#intro-text', {
    speed: 25,
  })
    .type('vítejte.', { delay: 300 })
    .delete(null, { delay: 250 })
    .type(`${mobile ? 'tap' : 'zmáčkněte jakékoliv tlačítko'} pro vstup.`)
    .go();

  setTimeout(function () {
    switchAllowed = true;
  }, 250);
}

function typerStartTyping(typer) {
  typer.reset();

  let text = ['Frakce', 'Kitmap', 'Practice'];

  text.forEach(function (language, index) {
    typer.move(null);
    typer.type(language, { delay: 1000 });
    typer.pause(1000);

    typer.delete(language.length, { delay: 1000 });
  });

  typer.go();
}

function startMainTyping() {
  let typer = new TypeIt('#subtext', {
    speed: 50,
    afterComplete: async () => {
      typerStartTyping(typer);
    },
  });

  typerStartTyping(typer);
}

function switchScreen() {
  document.title = 'pvpzone.cz | home';

  $('.intro').fadeOut(300, function () {
    $('.bg-image').fadeIn(300);
    $('.main').fadeIn(300, function () {
      startMainTyping();
    });
  });

  ['background', 'rain'].forEach(function (audioName) {
    let fullPath = `assets/audio/${audioName}.mp3`;

    let audioElement = document.createElement('audio');
    audioElement.setAttribute('src', fullPath);
    audioElement.style.display = 'none';

    audioElement.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    });

    audioElement.play();
  });
}

document.addEventListener('keydown', function (e) {
  if (switchAllowed) {
    switchAllowed = false;
    switchScreen();
  }
});

document.addEventListener('touchstart', function (e) {
  if (switchAllowed && mobile) {
    switchAllowed = false;
    switchScreen();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  startIntroTyping();
});
