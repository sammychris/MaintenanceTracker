import getAllRequest from './getAllRequest';

// This part is for the board... on hover
export default (id, event, padding, icon) => {
    const itemDist = document.getElementsByClassName('des');
    const board = document.getElementById('board');
    getAllRequest().then((result) => {
        const data = result.requests.find(a => a.id === id);
        itemDist[0].innerHTML = data.date;
        itemDist[1].innerHTML = data.name;
        itemDist[2].innerHTML = data.type;
        itemDist[3].innerHTML = data.description;
        board.style.display = 'block';
        board.style.top = `${event.clientY + padding}px`;
        icon.style.display = 'none';
    });
};
