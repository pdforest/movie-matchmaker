import { login, signup } from '../auth/actions'
import { Film } from 'lucide-react'

export default async function LoginPage(props: {
  searchParams: Promise<{ message?: string }>
}) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 selection:bg-rose-500/30">
      
      {/* Decorative background blur objects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-600/10 blur-[100px] -z-10 rounded-full mix-blend-screen overflow-hidden" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[100px] -z-10 rounded-full mix-blend-screen overflow-hidden" />

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-8 text-rose-500">
          <Film size={48} strokeWidth={1.5} />
        </div>

        <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome</h1>
            <p className="text-neutral-400 text-sm">Sign in to your account or register</p>
          </div>

          <form className="space-y-6 flex-1 flex flex-col w-full text-neutral-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1" htmlFor="email">Email</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950/50 border border-neutral-800 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors outline-none placeholder:text-neutral-600"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1" htmlFor="password">Password</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950/50 border border-neutral-800 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors outline-none placeholder:text-neutral-600"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                formAction={login}
                className="w-full py-3 px-4 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-95"
              >
                Sign In
              </button>
              <button
                formAction={signup}
                className="w-full py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl border border-neutral-700 transition-all hover:scale-[1.02] active:scale-95"
              >
                Sign Up
              </button>
            </div>
            
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-red-950/50 text-red-200 text-center text-sm rounded-lg border border-red-900/50">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
