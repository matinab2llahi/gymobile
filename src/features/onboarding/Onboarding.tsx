"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useOnboardingStore} from "./stores/onboarding-store";
import {PlanStepSection} from "./sections/PlanStepSection";
import {ProfileStepSection} from "./sections/ProfileStepSection";
import {paths} from "@/routes/paths";

export function Onboarding() {
    const router = useRouter();
    const step = useOnboardingStore((s) => s.step);
    const isCompleted = useOnboardingStore((s) => s.isCompleted);

    useEffect(() => {
        if (isCompleted) {
            router.push(paths.home());
        }
    }, [isCompleted, router]);

    return (

        <div dir={"ltr"} className="flex flex-col items-center justify-center min-h-screen px-6 py-16 ">
            {step === "plan" ? <PlanStepSection/> : <ProfileStepSection/>}
        </div>
    );
}
