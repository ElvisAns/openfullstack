import Helmet from 'react-helmet'
const Blogs = () => {
    return (
        <>
            <Helmet>
                <title>Blogs</title>
            </Helmet>
            <div className='bg-primary h-12 text-center'>
            </div>
            <div className='py-5'>
                <h1 className='text-4xl text-center text-primary font-bold tracking-wider'>Blogs posts</h1>
            </div>

            <div className='w-100 min-h-24 px-24 py-10 flex flex-wrap gap-10'>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_0mLWu2GcjGJroj4TsRsbDiVrb18s_4EgQ&usqp=CAU" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Read more</button>
                        </div>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_0mLWu2GcjGJroj4TsRsbDiVrb18s_4EgQ&usqp=CAU" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Read more</button>
                        </div>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_0mLWu2GcjGJroj4TsRsbDiVrb18s_4EgQ&usqp=CAU" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Read more</button>
                        </div>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_0mLWu2GcjGJroj4TsRsbDiVrb18s_4EgQ&usqp=CAU" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Read more</button>
                        </div>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_0mLWu2GcjGJroj4TsRsbDiVrb18s_4EgQ&usqp=CAU" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Read more</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blogs