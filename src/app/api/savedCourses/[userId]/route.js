import clientPromise from '../../../../../mongodb';

export async function GET(req, res) {
    

    try {

        const url = new URL(req.url, `http://${req.headers.host}`);
        const userId = url.pathname.split('/').pop();
        
        const client = await clientPromise;
        const db = client.db("niner-rate");

        // Fetch the user by userId
        const user = await db.collection('users').findOne({ userId });
        if (!user) return new Response('User not found', { status: 404 });

        // Fetch courses details based on savedCourses codes
        const courses = await db.collection('courses').find({ 
          code: { $in: user.savedCourses }
        }).toArray();

        return new Response(JSON.stringify(courses), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Failed to fetch saved courses:", error);
        // Consider logging more details here
        return res.status(500).json({ message: "Failed to fetch saved courses", error: error.message });
    }
}