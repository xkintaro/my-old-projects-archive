function attack(attacker) {
    const random = Math.random() * 100;
    const kritik = random <= attacker.kritik_ihtimali;
    const DMGM = attacker.saldiri_gucu * attacker.hasar_bonusu * (kritik ? attacker.kritik_hasari : 1);
    return { DMGM, kritik };
}

function takeDamage(attacker, defender, DMGM) {
    const ODMGM = DMGM * 100 / (100 + defender.zirh * attacker.zirh_delme_p - attacker.zirh_delme);

    defender.can = Math.max(defender.can - ODMGM, 0);
    return ODMGM;
}

function hesaplaHasar(attacker, defender) {
    const { DMGM, kritik } = attack(attacker);
    const ODMGM = takeDamage(attacker, defender, DMGM);
    return {
        damage: ODMGM,
        defenderHp: defender.can,
        kritik
    };
}

module.exports = { attack, takeDamage, hesaplaHasar };
