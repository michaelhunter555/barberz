import { StyledView, StyledText } from '../../components/shared/SharedStyles';
import { List } from 'react-native-paper';

const FAQS = [
    {question: 'How can I contact support?', response: 'You can contact support by opening a support item, live Chat or email @email.com'},
    {question: 'What happens if...', response: 'In the event...'},
    {question: 'What happens if...', response: 'In the event...'},
    {question: 'What happens if...', response: 'In the event...'},
    {question: 'What happens if...', response: 'In the event...'},
    {question: 'What happens if...', response: 'In the event...'},
    {question: 'What happens if...', response: 'In the event...'}
];

const FaqAccordion = () => {
   return (
    <List.AccordionGroup>
    {FAQS.map((faq, i) => (
        <List.Accordion key={i} title={faq.question} id={i}>
            <List.Item title={faq.response} />
        </List.Accordion>
    ))}
</List.AccordionGroup>
   )
};

export default FaqAccordion;