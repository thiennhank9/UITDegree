const driver = require('bigchaindb-driver')

const API_PATH = 'http://localhost:9984/api/v1/'

function makeUserKeyPair() {
    return new driver.Ed25519Keypair()
}


export async function createAssets(data, meta_data, ownerAsset) {
    // Construct a transaction payloa
    let transaction = {};
    const tx = driver.Transaction.makeCreateTransaction(
    // Define the asset to store, in this example it is the current temperature
    {data,},

    // Metadata contains information about the transaction itself
    // (can be `null` if not needed)
    meta_data,

    // A transaction needs an output
    [ driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(ownerAsset.publicKey))
    ],
    ownerAsset.publicKey
    )

    // Sign the transaction with private keys
    const txSigned = driver.Transaction.signTransaction(tx, ownerAsset.privateKey)

    const conn = new driver.Connection(API_PATH)

    await conn.postTransactionCommit(txSigned)
        .then(retrievedTx => {
            transaction = retrievedTx
    })

    return transaction
}

export async function transferAssets(txid, meta_data, beforeOwner, newOwner) {
    // decleare transaction id
    let transaction = {};

    const conn = new driver.Connection(API_PATH)

    const creation_tx = await conn.getTransaction(txid)
   
    const txTransfer = driver.Transaction.makeTransferTransaction(
        // signedTx to transfer and output index
        [{ tx: creation_tx, output_index: 0}],
        [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(newOwner.publicKey))],

        // metadata
        meta_data
    )

    const txSigned = driver.Transaction.signTransaction(txTransfer, beforeOwner.privateKey)
    
    await conn.postTransactionCommit(txSigned)
        .then(retrievedTx => {
            transaction = retrievedTx
        })

    return transaction
}

// txid: transaction id
export async function getTransaction(txid) {
    const conn = new driver.Connection(API_PATH)
    return await conn.getTransaction(txid)
}

export async function getTransactionBaseStudentID(studentID) {
    const conn = new driver.Connection(API_PATH)
    return await conn.searchAssets(studentID)
}

export async function getTransactionMetaDataBasestudentID(studentID) {
    const conn = new driver.Connection(API_PATH)
    return await conn.searchMetadata(studentID)
}

export {makeUserKeyPair}