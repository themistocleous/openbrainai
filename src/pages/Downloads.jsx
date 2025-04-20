import { motion } from 'framer-motion';

export default function Downloads() {
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <motion.h2
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Downloads
      </motion.h2>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {[
          { name: 'Open Brain AI Web App (Coming Soon)', link: '#' },
          { name: 'Sample Data (CSV)', link: '#' },
          { name: 'Research Paper PDF', link: '#' },
        ].map((item, i) => (
          <motion.li
            key={i}
            className="mb-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          >
            <a href={item.link} className="text-blue-600 hover:underline" download>
              {item.name}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
