import Bignumber from 'bignumber.js';
export function weiToEth(wei) {
    return new Bignumber(wei).div(1e18).toString(10);
}
