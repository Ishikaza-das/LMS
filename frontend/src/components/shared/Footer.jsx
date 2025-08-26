
export default function Footer() {
  return (
    <footer className="text-gray-200 py-8 px-4 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">LearnUp</h3>
          <p className="text-sm">
            Empowering learners and instructors through a modern, scalable online platform.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">Explore</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/courses" className="hover:text-white">Courses</a></li>
            <li><a href="/instructors" className="hover:text-white">Instructors</a></li>
            <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">Resources</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/support" className="hover:text-white">Support</a></li>
            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">Stay Connected</h4>
          <form className="flex flex-col space-y-2 text-sm">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} EduLearn. All rights reserved.
      </div>
    </footer>
  );
}
