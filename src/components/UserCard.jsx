
const UserCard = ({ user }) => {
    const { firstName, lastName, about, profileImage, age, gender } = user;
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={profileImage || "https://cdn.vectorstock.com/i/250p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.avif"}
                    alt="profile-pic" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + ' ' + lastName}</h2>
                {age && gender && <p>{age}, {gender}</p>}
                <p>{about || "A card component has a figure, a body part, and inside body there are title and actions parts"}</p>
                <div className="card-actions justify-end">
                    <div className="btn btn-primary">Ignore</div>
                    <div className="btn btn-secondary">Interested</div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
