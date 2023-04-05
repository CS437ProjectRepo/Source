// import React, { useState } from 'react';

// const Card = ({ name, description, tags }) => {
//   return (
//     <div className="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-2 px-4">
//       <div className="bg-white border rounded-lg overflow-hidden shadow-md">
//         <div className="p-4">
//           <h3 className="font-bold text-xl mb-2">{name}</h3>
//           <p className="text-gray-700 text-base">{description}</p>
//           <div className="mt-4">
//             {tags.map((tag, index) => (
//               <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export function FilterableCardList({ cardData, filters }) {
//     const [visibleCards, setVisibleCards] = useState(cardData);
//     const Filter = ({ filter }) => {
//         const handleOptionChange = e => {
//           const { value, checked } = e.target;
//           handleFilterChange(filter.type, value, checked);
//         };
//     const [filtersWithState, setFilters] = useState(
//       filters.map(filter => {
//         const optionsWithState = filter.options.map(option => {
//           return { ...option, isSelected: true };
//         });
//         return { ...filter, options: optionsWithState };
//       })
//     );
  
//     const handleFilterChange = (type, value, isChecked) => {
//       const updatedFilters = filtersWithState.map(filter => {
//         if (filter.type === type) {
//           const updatedOptions = filter.options.map(option => {
//             if (option.value === value) {
//               return {
//                 ...option,
//                 isSelected: isChecked
//               };
//             }
//             return option;
//           });
//           return {
//             ...filter,
//             options: updatedOptions
//           };
//         }
//         return filter;
//       });
  
//       setFilters(updatedFilters);
  
//       const selectedFilters = updatedFilters.reduce((acc, filter) => {
//         const selectedOptions = filter.options.filter(option => option.isSelected);
//         return [...acc, ...selectedOptions];
//       }, []);
  
//       const filteredCards = cardData.filter(card => {
//         return selectedFilters.some(filter => card.tags.includes(filter.value));
//       });
  
//       setVisibleCards(filteredCards);
//     };
  
//     return (
//       <div>
//         <div className="flex space-x-4">
//           {filtersWithState.map(filter => (
//             <Filter key={filter.type} filter={filter} handleFilterChange={handleFilterChange} />
//           ))}
//         </div>
//         <div className="flex flex-wrap">
//           {visibleCards.map(card => (
//             <Card key={card.name} card={card} />
//           ))}
//         </div>
//       </div>
//     );
//   }
  