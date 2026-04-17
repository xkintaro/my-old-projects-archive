import NotFound404Image from '/assets/404.webp';

export default function NotFound404() {
    return (
        <div className='w-full min-h-[50vh] overflow-hidden flex flex-col items-center justify-center '>
            <img src={NotFound404Image} alt="Not Found" className="w-48 h-fit" />
            <p className="text-[var(--text-1)] text-base text-center max-w-lg">Oops! Görünüşe göre aradığınız içerik artık burada değil. Silinmiş, taşınmış ya da yapım aşamasında olabilir.</p>
            <i className="text-[var(--text-2)] text-base text-center ">-404 Not found-</i>
        </div>
    )
}