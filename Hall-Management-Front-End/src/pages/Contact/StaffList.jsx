

const StaffList = () => {
    return (
<div className=" ">

    <h3 className="text-3xl font-bold flex justify-center items-center">Staff List</h3>

    <div className='flex flex-col justify-center items-center mt-5 space-y-5'>
        <div className="my-4 w-72 p-4 ">
            <input type="radio" name="radio-10" className="radio radio-error" />
            <span className='ml-2'>John Doe</span>
            <br />
            <span className='ml-6'>Supervisor</span>
            <br />
            <span className='ml-6'>john.doe123@mail.com</span>
            <br />
            <span className='ml-6'>01711223344</span>
        </div>

        <div className="my-4 w-72 p-4 ">
            <input type="radio" name="radio-10" className="radio radio-error" />
            <span className='ml-2'>Jane Smith</span>
            <br />
            <span className='ml-6'>Supervisor</span>
            <br />
            <span className='ml-6'>jane.smith456@mail.com</span>
            <br />
            <span className='ml-6'>01822334455</span>
        </div>

        <div className="my-4 w-72 p-4 ">
            <input type="radio" name="radio-10" className="radio radio-error" />
            <span className='ml-2'>Alex Brown</span>
            <br />
            <span className='ml-6'>Supervisor</span>
            <br />
            <span className='ml-6'>alex.brown789@mail.com</span>
            <br />
            <span className='ml-6'>01633445566</span>
        </div>
    </div> 

</div>

    );
};

export default StaffList;