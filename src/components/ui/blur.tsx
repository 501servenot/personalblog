export default function NewBlurLayer() {
    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 z-10 h-24 backdrop-blur-sm"
                style={{
                    maskImage:
                        'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
                    WebkitMaskImage:
                        'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
                }}
            />
            <div
                className="fixed top-0 left-0 right-0 z-20 h-24 backdrop-blur-sm"
                style={{
                    maskImage:
                        'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
                    WebkitMaskImage:
                        'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
                }}
            />
            <div
                className="fixed top-0 left-0 right-0 z-30 h-24 backdrop-blur-sm"
                style={{
                    maskImage:
                        'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
                    WebkitMaskImage:
                        'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
                }}
            />
        </>
    )
}