import {FC, PropsWithChildren} from "react";

export type ApplyContextsProps = PropsWithChildren & {
    contexts: FC[]
}

export const ApplyContexts = ({ children, contexts }: ApplyContextsProps) =>
    contexts.reduceRight((acc, ContextProvider) => (
        <ContextProvider>
            {acc}
        </ContextProvider>
    ), children)