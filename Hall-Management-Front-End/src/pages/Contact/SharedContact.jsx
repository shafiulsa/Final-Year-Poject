

const SharedContact = () => {
    return (

        <>
            <div className="pt-5 ">

                <h3 className="text-3xl font-bold flex justify-center items-center">Contact</h3>
                <div className='flex  justify-center items-center mt-5 space-x-20'>
                    <div className="my-4 items-start ">
                        <input type="radio" name="radio-10" className="radio radio-error" />
                        <span className='ml-2'>Bijoy 24 Hall</span>
                        <br />
                        <span className='ml-6'>Mawlana Bhashani Science and Technology University</span>
                        <br />
                        <span className='ml-6'>Santosh, Tangail, Dhaka, Bangladesh</span>
                    </div>

                    <div className="my-4  items-start ">
                        <input type="radio" name="radio-10" className="radio radio-error" />
                        <span className='ml-2'>Email</span>
                        <br />
                        <span className='ml-6'>email: xyz@mbst.ac.bd</span>
                        <br />
                        <span className='ml-6'>email: abcd@gmail.com</span>
                    </div>

                    <div className="my-4  items-start ">
                        <input type="radio" name="radio-10" className="radio radio-error" />
                        <span className='ml-2'>Tel:</span>
                        <br />
                        <span className='ml-6'>+8801 234 567 890</span>
                        <br />
                        <span className='ml-6'>+88017 987 654 321</span>
                    </div>

                </div>
            </div>
        </>


    );
};

export default SharedContact;