import { Provider } from "react-redux";
import { store } from "./index";
import { persistStore } from "redux-persist";
import { useEffect, useState } from "react";

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isPersisted, setIsPersisted] = useState(false);

    useEffect(() => {
        const persist = async () => {
            await persistStore(store);
            setIsPersisted(true);
        };
        persist();
    }, []);

    // Render children only after persistStore completes
    return isPersisted ? <Provider store={store}>{children}</Provider> : null;
}
