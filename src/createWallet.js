//importando as dependencias
import { fromSeed } from 'bip32';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { networks, payments } from 'bitcoinjs-lib';

//definir a rede
//bitcoin - rede principal - mainnet
//bitcion - rede de teste - testenet
const network = networks.testnet

//derivação de carteiras HD (Hierarquical Determinist)
const path = `m/49'/1'/0'/0'`

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = generateMnemonic()
const seed = mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada: ", node.toWIF()) //Wallet Import Format
console.log("Seed", mnemonic)