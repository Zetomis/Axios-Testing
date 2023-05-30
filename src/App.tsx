import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchUsers, patchUsers } from "./redux/UsersSlice";

const App = () => {
    const users = useAppSelector((state) => state.users.users);
    const loading = useAppSelector((state) => state.users.loading);
    const error = useAppSelector((state) => state.users.error);
    const [inputState, setInputState] = useState("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const handleClick = () => {
        dispatch(patchUsers({ id: "yes", content: inputState }));
    };

    console.log(users);

    return (
        <div>
            aaa
            {loading && <h1>Loading...</h1>}
            {error && <h1>Error</h1>}
            {users.map((user) => (
                <h1>{user.name}</h1>
            ))}
            <button onClick={handleClick}>Kill me</button>
            <input
                type="text"
                onChange={(e) => setInputState(e.target.value)}
            />
        </div>
    );
};

export default App;
