export function Footer() {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-16">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <p className="text-sm text-neutral-500">
                    © {new Date().getFullYear()} Simon Ryu. Built with Next.js, TypeScript, and MDX.
                </p>
            </div>
        </footer>
    );
}
