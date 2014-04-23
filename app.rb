require 'sinatra'
set :public_folder, File.dirname(__FILE__) + '/'
enable :static

get '/' do
    File.read('resume.html')
end