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

export async function POST(req, res) {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const userId = url.pathname.split('/').pop();

        const client = await clientPromise;
        const db = client.db("niner-rate");

        // Get the courseCode from the request body
        const {courseCode} = await req.json(); 
        console.log("in the route the courseCode: ", courseCode);

        // Fetch the user by userId
        const user = await db.collection('users').findOne({ userId });
        if (!user) return new Response('User not found', { status: 404 });

        // Update the user's savedCourses array
        const updatedUser = await db.collection('users').findOneAndUpdate(
            { userId },
            { $addToSet: { savedCourses: courseCode } },
            { returnDocument: 'after' }
        );

        return new Response(JSON.stringify(updatedUser.savedCourses), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Failed to save course:", error);
        // Consider logging more details here
        return res.status(500).json({ message: "Failed to save course", error: error.message });
    }
}

export async function DELETE(req, res) {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const userId = url.pathname.split('/').pop();
        const { courseCode } = await req.json();

        const client = await clientPromise;
        const db = client.db("niner-rate");

        // Fetch the user by userId
        const user = await db.collection('users').findOne({ userId });
        if (!user) return new Response('User not found', { status: 404 });

        // Update the user's savedCourses array
        const updatedUser = await db.collection('users').findOneAndUpdate(
            { userId },
            { $pull: { savedCourses: courseCode } },
            { returnDocument: 'after' }
        );

        return new Response(JSON.stringify(updatedUser.savedCourses), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Failed to delete course:", error);
        // Consider logging more details here
        return res.status(500).json({ message: "Failed to delete course", error: error.message });
    }
}