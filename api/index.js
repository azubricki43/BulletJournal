import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import { supabase } from '../lib/supabase.ts'

//Create express application
const app = express();

//Middleware enabling Cross-Origin Resource Sharing (CORS), allows secure API access from different origins
app.use(cors()); 
app.use(express.json())

/**
 * Function to create JWT login token for a user
 * Expires in 1 hour
 * @param {id of user} user_id 
 * @param {email of user} user_email 
 * @returns login token
 */
async function createLoginToken(user_id, user_email){
    const payload = {
        id: user_id,
        email: user_email
    };
    const secret = process.env.JWT_SECRET;
    const token = await jwt.sign(payload, secret, {expiresIn: '1h'});
    return token;
}

/**
 * Main API endpoint
 * For testing
 */
app.get('/', (req, res) => {
    res.send({message: 'API Main Route working'}, 200);
});

/**
 * Api login endpoint, take in user and their password hash (already bcrypt) and creates login token if valid
 * If not valid, returns specific error message
 */
app.post('/api/login', async (req, res) => {
    const { email, password_hash } = req.params
    try{
        const { data, error } = await supabase.from('users').select('*').eq('email', email);
        if (error) {
            console.error("Error fetching user:", error.message);
            return;
        }
        const user = data[0]
        const match = await bcrypt.compare(password_hash, user.password_hash)
        if(!match){
            return {error: true, msg: 'Incorrect password'}
        } 
        const token = await createLoginToken(user.id, user.email)
        res.json({token: token}, 200)
    } catch {
        return {error: true, msg: 'Error with login endpoint'}
    }    
    //res.json({message: 'reached login endpoint', email: email, password: password}, 200)
});

/**
 * API Registration Endpoint
 */
app.post('/api/register', async (req, res) => {
    const { name, email, password_hash } = req.params;
    try {
        const { data, error } = await supabase.from('users').select('*').eq('email', email);
        if (error) {
            console.error("Error fetching user:", error.message);
            return;
        }
        res.json({recieved: data}, 200);
    } catch {
        res.json({message: 'Error with registration endpoint'}, 401);
    }
});


/** This code is only for local deployment
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
*/

export default app;