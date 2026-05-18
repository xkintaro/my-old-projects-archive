const enemies = {
    1: {
        id: '1',
        name: 'Enemy1',
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
        name: 'Enemy2',
        image: "",
        max_can: 220,
        can: 220,
        saldiri_gucu: 8,
        kritik_hasari: 1.2,
        kritik_ihtimali: 30,
        hasar_bonusu: 1.2,
        zirh: 80,
        zirh_delme: 5,
        zirh_delme_p: 0.5,
    },
    3: {
        id: '3',
        name: 'Enemy3',
        image: "",
        max_can: 80,
        can: 80,
        saldiri_gucu: 18,
        kritik_hasari: 2.6,
        kritik_ihtimali: 70,
        hasar_bonusu: 1.2,
        zirh: 60,
        zirh_delme: 15,
        zirh_delme_p: 0.5,
    }

};

function getEnemyById(id) {
    const enemy = enemies[id];
    return enemy ? { ...enemy } : null;
}

module.exports = { getEnemyById };