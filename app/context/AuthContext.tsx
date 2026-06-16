
/*
interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (email: string, password:string)=> Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>
}

const TOKEN_KEY = 'my_jwt_token';
const BACKEND_URL = 'https://bullet-journal-two.vercel.app'
const AuthContext = createContext<AuthProps>({});

async function createLoginToken(user_id : number, user_email : string){
    const payload = {
        id: user_id,
        email: user_email
    };
    const secret = process.env.JWT_SECRET!;
    const token = await jwt.sign(payload, secret, {expiresIn: '1h'});
    return token;
}

export const useAuth = () => {
    return useContext(AuthContext);
};

*/
/**
 * Sets state and returns value
 * @param param
 * @returns 
 */
/**
export const AuthProvider = ({children} : any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token : null,
        authenticated : null
    });

useEffect(() => {
    const loadToken = async () => {
        const token = await SecureStorage.getItemAsync(TOKEN_KEY);
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setAuthState({
                token: token,
                authenticated: true
            })
        }
    };
    loadToken();
}, []);

    
    const register = async (name: string, email: string, password: string) => {
        try {
            const { data, error } = await supabase.from('users').select('email').eq('email', email)
            if (error) {
                console.error("Error fetching user:", error.message);
                return;
            }
            const emailExists = data && data.length > 0;
            if(emailExists){
                return { error: true, msg : "Email already registered"}
            } else {
                return await supabase.from('users').insert({name: name, email: email, password_hash: password})
            }
        } catch {
            return { error: true, msg: "creating account failed"}
        }
    }


    const login = async (email: string, password: string) => {
        try{
            const { data, error } = await supabase.from('users').select('*').eq('email', email);
            if (error) {
                console.error("Error fetching user:", error.message);
                return;
            }
            const user = data[0]
            const match = await bcrypt.compare(password, user.password_hash)
            if(!match){
                return {error: true, msg: 'Incorrect password'}
            } 
            const token = await createLoginToken(user.id, user.email)

            setAuthState({
                token: token,
                authenticated: true
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            await SecureStorage.setItemAsync(TOKEN_KEY, token)
            return;
        } catch (e) {
            return { error: true, msg: "Error logging in"}
        }
    }

    const logout = async () => {
        await SecureStorage.deleteItemAsync(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = '';
        setAuthState({
            token: null,
            authenticated: false
        });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}*/