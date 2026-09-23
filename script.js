const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.classList.add('active');
            revealObserver.unobserve(entry);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -20px 0px'
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <button class="close-modal" aria-label="Close popup">×</button>
        <h2 id="modal-title">Web3 Topic</h2>
        <p id="modal-description"></p>
        <img id="modal-image" class="modal-image" src="" alt="Web3 topic" />
        <div class="modal-example">
            <h3>Example</h3>
            <p id="modal-example"></p>
        </div>
        <div class="modal-tags" id="modal-tags"></div>
    </div>
`;
document.body.appendChild(modal);

const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalImage = document.getElementById('modal-image');
const modalExample = document.getElementById('modal-example');
const modalTags = document.getElementById('modal-tags');
const closeButton = document.querySelector('.close-modal');

const topicData = {
    blockchain: {
        title: 'Blockchain',
        description: 'A blockchain is a distributed digital ledger that records transactions across a network of computers. It creates shared trust and transparency without needing a single central authority.',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
        example: 'Bitcoin and Ethereum both rely on blockchain networks to validate and record transactions securely.',
        tags: ['Security', 'Decentralization', 'Trust']
    },
    crypto: {
        title: 'Cryptocurrency',
        description: 'Cryptocurrencies are digital assets that can move across blockchain networks and are often used for payments, investments, or access to decentralized services.',
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1200&q=80',
        example: 'A user can send ETH to another wallet or use it to interact with a decentralized application.',
        tags: ['Payments', 'Tokens', 'Finance']
    },
    contracts: {
        title: 'Smart Contracts',
        description: 'Smart contracts are code stored on the blockchain that automatically executes when certain conditions are met, making processes more efficient and transparent.',
        image: 'https://images.unsplash.com/photo-1558494949cc5c4c6c6d6d8d5d6b5d5f?auto=format&fit=crop&w=1200&q=80',
        example: 'A lending protocol can automatically release funds once collateral exceeds the required threshold.',
        tags: ['Automation', 'Logic', 'Protocols']
    },
    nft: {
        title: 'NFTs',
        description: 'NFTs are unique digital tokens stored on a blockchain. They can represent art, collectibles, access passes, and other digital ownership records.',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
        example: 'An artist can mint a digital artwork as an NFT and prove ownership on-chain.',
        tags: ['Collectibles', 'Ownership', 'Art']
    },
    dao: {
        title: 'DAOs',
        description: 'Decentralized Autonomous Organizations are community-governed groups that coordinate decisions and resources without a single central manager.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
        example: 'A DAO can let members vote on treasury spending, roadmap choices, or protocol upgrades.',
        tags: ['Governance', 'Community', 'Voting']
    },
    wallets: {
        title: 'Web3 Wallets',
        description: 'Web3 wallets let users manage accounts, hold digital assets, and interact with decentralized apps directly from their browser or mobile device.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        example: 'A wallet connects a user to a dApp so they can sign in, approve transactions, and store tokens.',
        tags: ['Identity', 'Access', 'Security']
    }
};

const openModal = (topicKey) => {
    const topic = topicData[topicKey];
    if (!topic) return;

    modalTitle.textContent = topic.title;
    modalDescription.textContent = topic.description;
    modalImage.src = topic.image;
    modalExample.textContent = topic.example;
    modalTags.innerHTML = topic.tags.map((tag) => `<span class="modal-tag">${tag}</span>`).join('');
    modal.classList.add('active');
};

const closeModal = () => {
    modal.classList.remove('active');
};

const exploreButtons = document.querySelectorAll('.explore-btn');
exploreButtons.forEach((button) => {
    button.addEventListener('click', () => {
        openModal(button.dataset.topic);
    });
});

closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
});
