import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {paths} from "@/routes/paths";

export const HomeViewModel = () => {
    const navigate = useRouter()

    useEffect(() => {
        navigate.push(paths.login())
    }, []);

    return {

    }
}