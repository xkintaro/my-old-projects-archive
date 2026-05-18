const characters = {
    1: {
        id: '1',
        name: 'kintaro',
        image: "",
        max_can: 100,
        can: 100,
        saldiri_gucu: 10,
        kritik_hasari: 1.5,
        kritik_ihtimali: 50,
        hasar_bonusu: 1.5,
        zirh: 50,
        zirh_delme: 10,
        zirh_delme_p: 0.6,
    },
    2: {
        id: '2',
        name: 'leywin',
        image: "",
        max_can: 120,
        can: 120,
        saldiri_gucu: 12,
        kritik_hasari: 1.6,
        kritik_ihtimali: 30,
        hasar_bonusu: 1.2,
        zirh: 60,
        zirh_delme: 15,
        zirh_delme_p: 0.5,
    }
};

function getCharacterById(id) {
    const character = characters[id];
    return character ? { ...character } : null;
}

module.exports = { getCharacterById };