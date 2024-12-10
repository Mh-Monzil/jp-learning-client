import ReactPlayer from 'react-player';

const tutorials = [
  { id: 1, title: 'Basic Japanese Greetings', url: 'https://www.youtube.com/watch?v=example1' },
  { id: 2, title: 'Japanese Alphabet - Hiragana', url: 'https://www.youtube.com/watch?v=example2' },
  { id: 3, title: 'Common Japanese Phrases', url: 'https://www.youtube.com/watch?v=example3' },
  { id: 4, title: 'Japanese Numbers 1-100', url: 'https://www.youtube.com/watch?v=example4' },
  { id: 5, title: 'Basic Japanese Sentence Structure', url: 'https://www.youtube.com/watch?v=example5' },
  { id: 6, title: 'Japanese Verbs - Present Tense', url: 'https://www.youtube.com/watch?v=example6' },
  { id: 7, title: 'Japanese Adjectives', url: 'https://www.youtube.com/watch?v=example7' },
  { id: 8, title: 'Japanese Particles - は (wa) and が (ga)', url: 'https://www.youtube.com/watch?v=example8' },
];

const Tutorials = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Japanese Language Tutorials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">{tutorial.title}</h2>
            <div className="aspect-w-16 aspect-h-9">
              <ReactPlayer
                url={tutorial.url}
                width="100%"
                height="100%"
                controls
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;

