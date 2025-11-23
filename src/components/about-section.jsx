const AboutSection = () => {
  return (
    <section id="about" className="bg-[#43435E]">
      <div className="screen py-32">
        <div className="text-center space-y-1 md:space-y-2 mb-14">
          <h2 className="text-white text-2xl md:text-3xl font-bold">About</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We are pleased to share our mission and vision for a brighter future
            for the youth and our community.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0 text-center">
          {/* Mission */}
          <div className="bg-white shadow-md rounded-2xl p-8 w-full">
            <h3 className="text-xl font-bold text-dark mb-3">MISSION</h3>
            <p className="text-gray-700 leading-relaxed">
              Pangunahin sa aming adhikain ay ang mapaigting pa ang interes ng
              mga bata sa pagbabasa dahil iba pa rin ang naibibigay na kasiyahan
              ng pagbabasa. Nais din naming makatulong na mapalawak ang kaalaman
              at karunungan ng mga bata.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white shadow-md rounded-2xl p-8 w-full">
            <h3 className="text-xl font-bold text-dark mb-3">VISION</h3>
            <p className="text-gray-700 leading-relaxed">
              Ang magkaroon ng mga mamamayan na sagana sa karunungan upang
              makapaghahatid ng masaganang pamumuhay sa bawat pamilya at
              makadaragdag sa kaunlaran ng ating bayan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
